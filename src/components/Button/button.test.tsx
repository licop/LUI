import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button, {ButtonProps} from './button';

const defaultProps = {
    onClick: jest.fn()
}

const testProps: ButtonProps = {
    btnType: 'primary',
    size: 'lg',
    classname: 'klass'
}

const disabledProps: ButtonProps = {
    disabled: true,
    onClick: jest.fn()
}

describe('test button component', () => {
    it('should render the current default button', () => {
        const wrapper = render(<Button {...defaultProps}>nice</Button>);
        const element = wrapper.getByText('nice');        
        expect(element).toBeInTheDocument();

        expect(element.tagName).toEqual('BUTTON');
        expect(element).toHaveClass('btn btn-default');
        fireEvent.click(element);
        expect(defaultProps.onClick).toHaveBeenCalled();
    })
    it('should render the current component based on different props', () => {
        const wrapper = render(<Button {...testProps}>nice</Button>);
        const element = wrapper.getByText('nice');        
        expect(element).toBeInTheDocument();

        expect(element).toHaveClass('btn-lg klass btn-primary')
    })
    it('should render a link when btnType equals link and href is privided', () => {
        const wrapper = render(<Button btnType="link" href="https://blog.licop.cn">link</Button>)
        const element = wrapper.getByText('link');
        
        expect(element).toBeInTheDocument();
        expect(element.tagName).toEqual('A');
        expect(element).toHaveClass('btn btn-link');
    })
    it('should render disabled button when disabled set to true', () => {
        const wrapper = render(<Button {...disabledProps}>nice</Button>);
        const element = wrapper.getByText('nice') as HTMLButtonElement;        
        expect(element).toBeInTheDocument();

        expect(element.disabled).toBeTruthy();
        fireEvent.click(element);
        expect(disabledProps.onClick).not.toHaveBeenCalled()
    })
})
