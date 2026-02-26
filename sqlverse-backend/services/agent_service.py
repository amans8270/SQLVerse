# app/services/agent_service.py

from langchain.agents import create_sql_agent, AgentType
from langchain.chat_models import ChatOpenAI

def build_sql_agent(sql_db: object):
    llm = ChatOpenAI(
        temperature=0,
        model="gpt-4"
    )

    agent = create_sql_agent(
        llm=llm,
        db=sql_db,
        agent_type=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
        verbose=False
    )

    return agent