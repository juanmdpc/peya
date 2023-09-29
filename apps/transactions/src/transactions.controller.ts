import { Controller } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CREATE_TRANSACTION } from '@app/common/constants/transaction-events';
import { CreateTransactionDto } from 'apps/api-gateway/src/transactions/dtos/requests/create-transaction.dto';

@Controller()
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @EventPattern(CREATE_TRANSACTION)
  async createTransaction(@Payload() data: CreateTransactionDto) {
    return this.transactionsService.create(data);
  }
}
