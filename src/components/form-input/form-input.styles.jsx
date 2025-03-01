import styled, { css } from "styled-components";

const subColor = 'grey';
const mainColor = 'black';

const shrinkLabelStyles = css`
    top: -14px; // Move the label up
    font-size: 12px; // Reduce the font size
    color: ${mainColor}; // Change the text color to black
`;

export const FormInputLabel = styled.label`
    color: ${subColor}; // Set default text color to grey
    font-size: 16px; // Set default font size
    font-weight: normal; // Set font weight
    position: absolute; // Position the label absolutely within the container
    pointer-events: none; // Disable pointer events (so clicks pass through to the input)
    left: 5px; // Position the label horizontally
    top: 10px; // Position the label vertically
    transition: all 300ms ease; // Add a smooth transition for property changes

    ${({$shrink}) => $shrink && shrinkLabelStyles}; // Apply the shrink effect when the .shrink class is added
`;

export const Input = styled.input`
    background: none; // Remove default background
    background-color: white; // Set background to white
    color: ${mainColor}; // Set text color to grey
    font-size: 18px; // Set font size
    padding: 10px 10px 10px 5px; // Add padding
    display: block; // Make the input a block element
    width: 100%; // Make the input take up full width
    border: none; // Remove borders
    border-radius: 0; // Remove border radius
    border-bottom: 1px solid ${subColor}; // Add bottom border
    margin: 25px 0; // Add vertical margin

    &:focus {
        outline: none; // Remove the default focus outline
    }

    &:focus ~ ${FormInputLabel} {
        ${shrinkLabelStyles}; // Apply the shrink effect when the input is focused
    }
`;

export const Group = styled.div`
    position: relative; // Set positioning context for child elements
    margin: 45px 0; // Add vertical margin
    
    input[type='password'] {
        letter-spacing: 0.3em; // Add extra letter spacing for password inputs
    }
`;
