from db_base import Base, engine
from sqlalchemy import Column, Integer, String, DATETIME, Boolean, DATE
from sqlalchemy.sql.expression import and_, func


class TradeHistory(Base):
    """Contains history of the trades for each symbols

    """
    __tablename__ = 'TradeHistory'
    __table_args__ = {'useexisting' : True}

    id = Column("Id", Integer, primary_key=True)
    symbol = Column("Symbol", String(100), nullable=False)
    date = Column("Date", DATE, nullable=False)
    open_val = Column("Open Price", Integer, nullable=False)
    high_val = Column("High Price", Integer, nullable=True)
    low_val = Column("Low Price", Integer, nullable=True)
    close_val = Column("Close Price", Integer, nullable=True)
    volume = Column("Volume", Integer, nullable=True)
    adj_close = Column("Adj Close", Integer, nullable=True)

Base.metadata.create_all(engine)
