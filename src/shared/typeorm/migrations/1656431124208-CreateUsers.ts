import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1656431124208 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {

    await queryRunner.createTable(new Table({
      name: 'users',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          generationStrategy: 'increment',
          default: 1
        },
        {
          name: 'email',
          type: 'varchar',
          isUnique: true
        },
        {
          name: 'name',
          type: 'varchar',
        },
        {
          name: 'password',
          type: 'varchar'
        },
        {
          name: 'avatar',
          type: 'varchar',
          isNullable: true
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'now()'
        },
        {
          name: 'updated_at',
          type: 'timestamp',
          default: 'now()'
        }
      ]
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }

}
