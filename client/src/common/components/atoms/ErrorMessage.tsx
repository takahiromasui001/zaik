import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  margin-bottom: 10px;
  color: #ff4d50;
`

type TErrorMessagesProps = {
  messages: string[]
}

export const ErrorMessages: React.FC<TErrorMessagesProps> = (props) => {
  const { messages } = props

  return (
    <Container>
      {messages.length !== 0 &&
        messages.map((message, index) => (
          <div key={index}>{`・${message}`}</div>
        ))}
    </Container>
  )
}

export const ErrorMessage: React.FC<{ message: string }> = (props) => (
  <Container>{props.message}</Container>
)
