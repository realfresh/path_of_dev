import React from "react"
import styled from "styled-components"
import { theme } from "../theme"

interface Props {
  tabs: Array<{
    name: string
    steps: Array<{
      title: string;
      body: React.ReactNode;
    }>
  }>
}

const Wrapper = styled.div`
  background: white;
  width: 100%;
  display: flex;
  height: 700px;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.2);
  > .navigation {
    min-width: 270px;
    width: 270px;
    background: ${theme.dark95};
    color: white;
    
    > .tabs {
      display: flex;
      > .tab {
        width: 50%;
        text-align: center;
        padding: 15px;
        background: ${theme.text};
        cursor: pointer;
        font-weight: 600;
        &.active {
          background: ${theme.dark95};
        }
      }
    }
    
    > .steps {
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      > .step {
        position: relative;
        width: 100%;
        padding: 15px 15px 15px 35px;
        cursor: pointer;
        font-size: 0.95rem;
        border-bottom: 1px solid ${theme.dark90};
        &.active {}
        > .indicator {
          position: absolute;
          width: 8px;
          height: 8px;
          background: ${theme.primary};
          top: 50%;
          transform: translateY(-50%);
          left: 15px;
        }
      }
    }
    
  }
  > .content {
  
    flex-grow: 1;
    overflow-y: auto;
    padding: 40px 30px;
    
     > * {
      margin-top: 20px;
      &:first-child {
        margin-top: 0;
      }
    }
    
    .divider {
      margin: 20px 0;
      width: 100%;
      border-bottom: 1px solid gray;
    }
    
    h3 {
      margin-top: 30px;
    }
    
    p {
      font-size: 0.95rem;
      line-height: 1.5;
    }
    
    p, li {
      > code {
        background: rgba(47,208,35,0.15);
        padding: 3px 5px;
        font-size: 0.85rem;
      }
    }
    
    ul {
      padding: 0 0 0 25px;
      list-style: disc;
      li {
        font-size: 0.95rem;
        line-height: 1.5;
        margin-bottom: 8px;
        &:last-child { 
          margin-bottom: 0 
        }
      }
    }
    
    table {
      width: 100%;
      overflow: auto;
      display: block;
      border-spacing: 0;
      border-collapse: collapse;
      tr {
        border-top: 1px solid #ccc;
        background-color: #fff;
        text-align: left;
      }
      tr:nth-child(2n) {
        background-color: #f8f8f8;
      }
      th, td {
        border: 1px solid #ddd;
        padding: 8px 13px;
        font-size: 0.85rem;
        line-height: 1.2rem;
      }
    }
    
  }
`

export const Instructions = ({ tabs }: Props) => {

  const [tab, setTab] = React.useState(0)
  const [step, setStep] = React.useState(0)

  return (
    <Wrapper>
      <div className="navigation">
        <div className="tabs">
          {tabs.map(({ name }, i) => (
            <div
              key={i}
              className={tab === i ? "tab active" : "tab"}
              onClick={() => {
                setStep(0)
                setTab(i)
              }}>
              {name}
            </div>
          ))}
        </div>
        <div className="steps">
          {tabs[tab].steps.map(({ title }, i) => (
            <div
              key={i}
              className={step === i ? "step active" : "step"}
              onClick={() => setStep(i)}>
              {step === i && <div className="indicator"/>}
              {title}
            </div>
          ))}
        </div>
      </div>
      <div className="content">
        {!!tabs[tab] && (
          <>
            <h2>{tabs[tab].steps[step].title}</h2>
            <div className="divider"/>
            {tabs[tab].steps[step].body}
          </>
        )}
      </div>
    </Wrapper>
  )

}