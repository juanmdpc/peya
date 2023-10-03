import { DatabaseService } from '@app/common';
import { ANTI_FRAUD_SERVICE } from '@app/common/constants/service-names';
import { VALIDATE_TRANSACTION } from '@app/common/constants/transaction-events';
import { VerifiedTransactionDto } from '@app/common/dtos/requests/verified-transaction.dto';
import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateTransactionDto } from 'apps/api-gateway/src/transactions/dtos/requests/create-transaction.dto';
import { TransactionStatusEnum } from 'apps/api-gateway/src/transactions/enums/transaction.enum';

@Injectable()
export class TransactionsService {
  constructor(
    @Inject(ANTI_FRAUD_SERVICE) private readonly client: ClientKafka,
    private readonly databaseService: DatabaseService,
  ) {}

  async create(input: CreateTransactionDto) {
    try {
      const transaction = await this.databaseService.transaction.create({
        data: { amount: input.amount, status: TransactionStatusEnum.PENDING },
        select: { uuid: true, amount: true },
      });

      this.client.emit(VALIDATE_TRANSACTION, transaction);
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }

  async updateStatus({ uuid, status }: VerifiedTransactionDto) {
    try {
      await this.databaseService.transaction.update({
        where: { uuid },
        data: { status },
      });
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }
}
