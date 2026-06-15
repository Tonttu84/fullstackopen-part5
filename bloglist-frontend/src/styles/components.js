import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Navbar = styled.nav`
  background: #1976d2;
  padding: 1rem 2rem;

  display: flex;
  align-items: center;
  gap: 1.5rem;

  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
`

export const Spacer = styled.div`
  flex-grow: 1;
`

export const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: bold;
  text-transform: uppercase;

  &:hover {
    opacity: 0.8;
  }
`

export const BlogList = styled.div`
  margin-left: 1.25rem;        
  margin-top: 0.5rem;

  & > div {
    display: flex;
    align-items: center;
    gap: 0.4rem;               
    margin: 0.15rem 0;         
  }

  & > div::before {
    content: "•";
    font-size: 1.1rem;
    line-height: 1;
    color: #333;
  }
`;

export const HiddenLabel = styled.label`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`



export const NotificationBox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;

  background: ${({ type }) =>
    type === 'error'
      ? '#ffebee'
      : '#e6f4ea'}; 

  color: ${({ type }) =>
    type === 'error'
      ? '#b71c1c'
      : '#1e4620'}; 

 

  padding: 0.75rem 1rem;
  margin: 1rem 2rem;

  border-radius: 6px;

  font-size: 0.95rem;
  font-weight: 500;

  box-shadow:
    0 1px 2px rgba(0,0,0,0.12);

  transition: opacity 0.2s ease;
`;

export const NotificationIcon = styled.div`
  font-size: 1.25rem;
  line-height: 1;
  margin-top: 2px;
`;



export const LogoutButton = styled.button`
  background: transparent;
  border: none;
  color: white;

  font-family: inherit;
  font-weight: bold;
  font-size: inherit;

  text-transform: uppercase;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`

export const Button = styled.button`
  background: #1976d2;
  color: white;

  border: none;
  border-radius: 4px;

  padding: 0.6em 1.4em;

  font-size: 1rem;
  font-weight: 500;

  text-transform: uppercase;

  cursor: pointer;

  box-shadow:
    0 2px 4px rgba(0,0,0,0.2),
    0 2px 6px rgba(0,0,0,0.15);

  transition:
    background 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    background: #1565c0;
  }

  &:active {
    box-shadow:
      0 1px 2px rgba(0,0,0,0.2);
  }
`

export const Input = styled.input`
  width: 260px;

  border: none;
  border-bottom: 1px solid #bdbdbd;

  padding: 0.4em 0.5em;
  margin: 0.75em 0;

  font-size: 1rem;        /* matches Button + NavLink */
  font-weight: 400;

  outline: none;
  background: transparent;

  &::placeholder {
    color: #666;
  }

  &:focus {
    border-bottom: 2px solid #1976d2;
  }
`;


export const BoxInput = styled(Input)`
  border: 1px solid #bdbdbd;
  

  

  background: white;
`
export const BlogContainer = styled.div`
  margin: 2rem;
  padding: 1.75rem 2rem;

  background: #fafafa;
  border-radius: 6px;

  box-shadow:
    0 2px 4px rgba(0,0,0,0.1),
    0 1px 2px rgba(0,0,0,0.08);
`;

export const BlogTitle = styled.h2`
  margin: 0 0 0.75rem 0;   
  font-size: 1.8rem;
  font-weight: 700;
`;

export const BlogMeta = styled.div`
  margin: 0 0 0.5rem 0;   
  font-size: 1rem;
  color: #444;

  line-height: 2;       

  a {
    color: #1976d2;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;

export const BlogActions = styled.div`
  margin-top: 0rem;     
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const OutlineButton = styled.button`
  background: white;
  color: #1976d2;
  border: 2px solid #1976d2;

  padding: 0.5em 1em;
  border-radius: 4px;

  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;

  cursor: pointer;

  transition:
    background 0.2s ease,
    color 0.2s ease;

  &:hover {
    background: #e3f2fd;
  }
`;

export const DangerButton = styled(OutlineButton)`
  color: #d32f2f;
  border-color: #d32f2f;

  &:hover {
    background: #ffebee;
  }
`;
