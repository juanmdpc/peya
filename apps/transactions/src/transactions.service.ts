import { DatabaseService } from '@app/common';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateTransactionDto } from 'apps/api-gateway/src/transactions/dtos/requests/create-transaction.dto';
import { TransactionStatusEnum } from 'apps/api-gateway/src/transactions/enums/transaction.enum';

@Injectable()
export class TransactionsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(input: CreateTransactionDto) {
    try {
      await this.databaseService.transaction.create({
        data: { amount: input.amount, status: TransactionStatusEnum.PENDING },
      });
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }
}
