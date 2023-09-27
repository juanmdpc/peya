import { TRANSACTIONS_SERVICE } from '@app/common/constants/service-names';
import { CREATE_TRANSACTION } from '@app/common/constants/transaction-events';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateTransactionDto } from 'apps/api-gateway/src/transactions/dtos/requests/create-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(
    @Inject(TRANSACTIONS_SERVICE) private readonly client: ClientKafka,
  ) {}

  create(input: CreateTransactionDto) {
    this.client.emit(CREATE_TRANSACTION, JSON.stringify(input));
  }
}
