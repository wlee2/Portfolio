import styled, { keyframes} from 'styled-components';

const ani = keyframes`
    from {
        transform: translateY(-60%);
    }
    to {
        transform: translateY(0%);
    }
`

const AnimatedLi = styled.li`
    list-style-type: none;
    &:hover {
        color: blue;
    }
    padding: 5px;
    border-bottom: 1px solid #ccc;
    animation: ${ani} 1s ease-out;
`;

export default {
    AnimatedLi
}
