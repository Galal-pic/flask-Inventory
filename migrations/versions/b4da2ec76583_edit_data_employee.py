"""Edit Data employee

Revision ID: b4da2ec76583
Revises: fe8df42b3663
Create Date: 2024-12-28 05:15:11.749005

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b4da2ec76583'
down_revision = 'fe8df42b3663'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('employee', schema=None) as batch_op:
        batch_op.add_column(sa.Column('job_name', sa.String(length=100), nullable=False))
        batch_op.add_column(sa.Column('phone_number', sa.String(length=20), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('employee', schema=None) as batch_op:
        batch_op.drop_column('phone_number')
        batch_op.drop_column('job_name')

    # ### end Alembic commands ###
