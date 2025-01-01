"""Add new fields to Employee model

Revision ID: 0891d6def78d
Revises: ad6480d3452c
Create Date: 2025-01-01 02:46:05.042137

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0891d6def78d'
down_revision = 'ad6480d3452c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('employee', schema=None) as batch_op:
        batch_op.alter_column('phone_number',
               existing_type=sa.VARCHAR(length=20),
               nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('employee', schema=None) as batch_op:
        batch_op.alter_column('phone_number',
               existing_type=sa.VARCHAR(length=20),
               nullable=False)

    # ### end Alembic commands ###
