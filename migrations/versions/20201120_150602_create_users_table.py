"""create_users_table

Revision ID: ffdc0a98111c
Revises:
Create Date: 2020-11-20 15:06:02.230689

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
revision = 'ffdc0a98111c'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('is_dependent', sa.Boolean, nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.Column('first_name', sa.String(length=255), nullable=False),
    sa.Column('last_name', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    )
    op.create_table('families',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('motto', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    )
    op.create_table('shopping_lists',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('item_name', sa.String(length=255), nullable=False),
    sa.Column('request', sa.Boolean, nullable=False),
    sa.Column('family_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['family_id'], ['families.id'], ),
    sa.PrimaryKeyConstraint('id'),
    )
    op.create_table('incomes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('amount', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id'),
    )
    op.create_table('expenses',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('amount', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id'),
    )
    op.create_table('medications',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('dosage', sa.String(length=255), nullable=False),
    sa.Column('time', sa.String(length=255), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id'),
    )
    op.create_table('appointments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('request', sa.Boolean, nullable=False),
    sa.Column('start_date', sa.String(length=255), nullable=False),
    sa.Column('duration', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id'),
    )
    op.create_table('user_families',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('family_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['family_id'], ['families.id'], ),
    sa.PrimaryKeyConstraint('id'),
    )

    if environment == "production":
        op.execute(f"ALTER TABLE families SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE shopping_lists SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE incomes SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE expenses SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE medications SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE appointments SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE user_families SET SCHEMA {SCHEMA};")
    # ### end Alembic commands ###qqqqqqqqq


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('users')
    op.drop_table('families')
    op.drop_table('shopping_lists')
    op.drop_table('incomes')
    op.drop_table('expenses')
    op.drop_table('medications')
    op.drop_table('appointments')
    op.drop_table('user_families')
    # ### end Alembic commands ###
