import SignUpPage from "./SignUpPage.vue" 
import {render, screen} from '@testing-library/vue'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import axios from 'axios'

describe('Sign Up Page', ()=> {
    describe('Layout', ()=>{
        it('has a Signup Header', ()=>{
            render(SignUpPage);
            const header = screen.queryByRole('heading', {name: 'Sign Up'});
            expect(header).toBeInTheDocument()
        })
        it('has two input fields', () => {
            const {container} = render(SignUpPage)
            const inputCount = container.querySelectorAll('input').length
            expect(inputCount).toBe(4)
        })
        it('has an username input field', () => {
            render(SignUpPage);
            const input = screen.queryByLabelText('Username')
            expect(input).toBeInTheDocument()
        })
        it('has an email input field', () => {
            render(SignUpPage);
            const input = screen.queryByLabelText('Email')
            expect(input).toBeInTheDocument()
        })
        it('has an password input field', () => {
            render(SignUpPage);
            const input = screen.queryByLabelText('Password')
            expect(input).toBeInTheDocument()
        })
        it('has password type for password input', () => {
            render(SignUpPage);
            const input = screen.queryByLabelText('Password')
            expect(input.type).toBe('password')
        })
        it('has an password repeat input field', () => {
            render(SignUpPage);
            const input = screen.queryByLabelText('Password Repeat')
            expect(input).toBeInTheDocument()
        })
        it('has password type for password repeat input', () => {
            render(SignUpPage);
            const input = screen.queryByLabelText('Password Repeat')
            expect(input.type).toBe('password')
        })
        it('has a Submit Button', ()=>{
            render(SignUpPage);
            const submitButton = screen.queryByRole('button', {name: 'Submit'});
            expect(submitButton).toBeInTheDocument()
        })
        it('Button is disabled', ()=>{
            render(SignUpPage);
            const submitButton = screen.queryByRole('button', {name: 'Submit'});
            expect(submitButton).toBeDisabled()
        })

    });
    describe('Interactions', () => {
        it('enables the button, if the input of password and repeat password match', async () => {
            render(SignUpPage);
            const passwordInput = screen.queryByLabelText('Password')
            const passwordRepeatInput = screen.queryByLabelText('Password Repeat')
            await userEvent.type(passwordInput, 'P4ssword')
            await userEvent.type(passwordRepeatInput, 'P4ssword')
            const button = screen.queryByRole('button', {name: 'Submit'})
            expect(button).toBeEnabled()

        })
        it('sends username, email and password to backend after clicking the button', async () => {
            render(SignUpPage);
            const usernameInput = screen.queryByLabelText('Username')
            const emailInput = screen.queryByLabelText('Email')
            const passwordInput = screen.queryByLabelText('Password')
            const passwordRepeatInput = screen.queryByLabelText('Password Repeat')
            await userEvent.type(usernameInput, 'user1')
            await userEvent.type(emailInput, 'user1@mail.com')
            await userEvent.type(passwordInput, 'P4ssword')
            await userEvent.type(passwordRepeatInput, 'P4ssword')
            const button = screen.queryByRole('button', {name: 'Submit'})

           

            const mockFn = jest.fn()
            axios.post = mockFn

            await userEvent.click(button)

            const firstCall = mockFn.mock.calls[0]
            const body = firstCall[1]

            expect(body).toEqual({
                username: 'user1',
                email: 'user1@mail.com',
                password: 'P4ssword'
            })

            expect(button).toBeEnabled()

        })
    })
})


