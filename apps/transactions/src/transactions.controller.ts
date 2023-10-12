import { Controller } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import {
  CREATE_TRANSACTION,
  GET_ONE_TRANSACTION,
} from '@app/common/constants/transaction-events';
import { CreateTransactionDto } from 'apps/api-gateway/src/transactions/dtos/requests/create-transaction.dto';
import { VERIFIED_TRANSACTION } from '@app/common/constants/anti-fraud-events';
import { VerifiedTransactionDto } from '@app/common/dtos/requests/verified-transaction.dto';
import { GetTransactionDto } from 'apps/api-gateway/src/transactions/dtos/requests/get-transaction.dto';

@Controller()
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @MessagePattern(CREATE_TRANSACTION)
  async createTransaction(@Payload() data: CreateTransactionDto) {
    return this.transactionsService.create(data);
  }

  @MessagePattern(GET_ONE_TRANSACTION)
  async getTransaction(@Payload() data: GetTransactionDto) {
    return this.transactionsService.getOne(data);
  }

  @EventPattern(VERIFIED_TRANSACTION)
  async updateTransactionStatus(@Payload() data: VerifiedTransactionDto) {
    return this.transactionsService.updateStatus(data);
  }
}
