import { Body, Controller, Post } from '@nestjs/common';
import { TransactionService } from './transactions.service';
import { CreateTransactionDto } from 'apps/api-gateway/src/transactions/dtos/requests/create-transaction.dto';
import { TransactionDto } from 'apps/api-gateway/src/transactions/dtos/responses/transaction.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly TransactionsService: TransactionService) {}

  @Post()
  async createTransaction(
    @Body() input: CreateTransactionDto,
  ): Promise<TransactionDto> {
    return this.TransactionsService.create(input);
  }
}
