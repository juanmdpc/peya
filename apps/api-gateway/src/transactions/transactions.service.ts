import { TRANSACTIONS_SERVICE } from '@app/common/constants/service-names';
import { CREATE_TRANSACTION } from '@app/common/constants/transaction-events';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateTransactionDto } from 'apps/api-gateway/src/transactions/dtos/requests/create-transaction.dto';
import { TransactionDto } from 'apps/api-gateway/src/transactions/dtos/responses/transaction.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TransactionService implements OnModuleInit {
  constructor(
    @Inject(TRANSACTIONS_SERVICE) private readonly client: ClientKafka,
  ) {}

  async create(input: CreateTransactionDto): Promise<TransactionDto> {
    const transaction = await firstValueFrom(
      this.client.send(CREATE_TRANSACTION, JSON.stringify(input)),
    );

    return transaction;
  }

  async onModuleInit() {
    this.client.subscribeToResponseOf(CREATE_TRANSACTION);
    await this.client.connect();
  }
}
