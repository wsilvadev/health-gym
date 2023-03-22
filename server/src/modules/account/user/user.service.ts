import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { User } from '@prisma/client'
import { compare, hash } from 'bcryptjs'

import { PrismaService } from 'src/infra/prisma.service'
import { omitProperties } from 'src/infra/utils/omit-properties'

import {
  CreateUserInput,
  UpdateUserAccessLevelInput,
  UpdateUserInput,
  type UserOmittedPassword,
} from './user.dto'

@Injectable()
export class UserService extends PrismaService {
  async create(data: CreateUserInput): Promise<UserOmittedPassword> {
    const { email, name, password } = data
    const hashedPassword = await hash(password, 10)
    const user = await this.user.create({
      data: { email, name, password: hashedPassword },
    })
    return omitProperties(user, ['password'])
  }

  async delete(id: string): Promise<boolean> {
    await this.findFirstWithPassword('id', id)
    const userDeleted = await this.user.delete({ where: { id } })
    return !!userDeleted
  }

  async findAll(): Promise<UserOmittedPassword[]> {
    const users = await this.user.findMany()
    const usersOmittedPassword = users.map(user => omitProperties(user, ['password']))
    return usersOmittedPassword
  }

  private async findFirst(field: string, value: any): Promise<UserOmittedPassword> {
    const user = await this.findFirstWithPassword(field, value)
    return omitProperties(user, ['password'])
  }

  private async findFirstWithPassword(field: string, value: any): Promise<User> {
    const user = await this.user.findFirst({ where: { [field]: value } })
    if (!user) throw new NotFoundException('User not found')
    return user
  }

  async findFirstByEmailWithPassword(email: string): Promise<User> {
    return this.findFirstWithPassword('email', email)
  }

  async findFirstById(id: string): Promise<UserOmittedPassword> {
    return this.findFirst('id', id)
  }

  async resetPassword(id: string, password: string): Promise<User> {
    await this.findFirstWithPassword('id', id)
    password = await hash(password, 10)
    return this.user.update({ where: { id }, data: { password } })
  }

  async update(id: string, data: UpdateUserInput): Promise<UserOmittedPassword> {
    const { email, name, current_password, password } = data
    const user = await this.user.findFirst({ where: { id } })
    if (email || password) {
      const match = await compare(current_password, user.password)
      if (!match) throw new UnauthorizedException('Incorrect current password')
    }
    const updatedUser = await this.user.update({
      where: { id },
      data: { email, name, password },
    })
    return omitProperties(updatedUser, ['password'])
  }

  async updateAccessLevel(
    id: string,
    data: UpdateUserAccessLevelInput
  ): Promise<UserOmittedPassword> {
    const { permissions, roles } = data
    const updatedUser = await this.user.update({
      where: { id },
      data: { permissions, roles },
    })
    return omitProperties(updatedUser, ['password'])
  }
}
