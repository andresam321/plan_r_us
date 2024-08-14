"""creating tables

Revision ID: 7a36332dbc1b
Revises: 
Create Date: 2024-08-13 20:25:20.160374

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7a36332dbc1b'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(length=40), nullable=False),
    sa.Column('last_name', sa.String(length=40), nullable=False),
    sa.Column('family_code', sa.String(length=10), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('first_name'),
    sa.UniqueConstraint('last_name')
    )
    op.create_table('events',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('creator_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('description', sa.String(length=100), nullable=False),
    sa.Column('event_date', sa.String(length=100), nullable=False),
    sa.Column('location', sa.String(length=100), nullable=False),
    sa.Column('organizer', sa.String(length=100), nullable=False),
    sa.Column('cut_of_date_to_bring_items', sa.String(length=100), nullable=False),
    sa.ForeignKeyConstraint(['creator_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('food_drink',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('event_id', sa.Integer(), nullable=True),
    sa.Column('brought_by_id', sa.Integer(), nullable=True),
    sa.Column('name_of_food', sa.String(length=50), nullable=False),
    sa.Column('name_of_drink', sa.String(length=50), nullable=True),
    sa.Column('type_of_food', sa.String(length=50), nullable=False),
    sa.Column('notes', sa.String(length=150), nullable=True),
    sa.ForeignKeyConstraint(['brought_by_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['event_id'], ['events.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('food_drink')
    op.drop_table('events')
    op.drop_table('users')
    # ### end Alembic commands ###
