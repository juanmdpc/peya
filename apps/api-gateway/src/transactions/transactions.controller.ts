import { Controller, Post } from '@nestjs/common';
import { TransactionService } from './transactions.service';
import { CreateTransactionDto } from 'apps/api-gateway/src/transactions/dtos/requests/create-transaction.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly TransactionsService: TransactionService) {}

  @Post()
  createTransaction(input: CreateTransactionDto) {
    return this.TransactionsService.create(input);
  }
}
