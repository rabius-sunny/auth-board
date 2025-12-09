import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from '@/components/ui/input'

describe('Input', () => {
  it('renders input with label', () => {
    render(<Input label='Email' name='email' />)
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
  })

  it('displays error message when error prop is provided', () => {
    render(<Input label='Email' name='email' error='Invalid email' />)
    expect(screen.getByText('Invalid email')).toBeInTheDocument()
  })

  it('shows eye icon for password field', () => {
    render(<Input label='Password' type='password' name='password' />)
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })

  it('toggles password visibility when eye icon is clicked', async () => {
    const user = userEvent.setup()
    render(<Input label='Password' type='password' name='password' />)

    const input = screen.getByLabelText('Password') as HTMLInputElement
    const toggleButton = screen.getByRole('button')

    expect(input.type).toBe('password')

    await user.click(toggleButton)
    expect(input.type).toBe('text')

    await user.click(toggleButton)
    expect(input.type).toBe('password')
  })

  it('accepts user input', async () => {
    const user = userEvent.setup()
    render(<Input label='Email' name='email' />)

    const input = screen.getByLabelText('Email') as HTMLInputElement
    await user.type(input, 'test@example.com')

    expect(input.value).toBe('test@example.com')
  })
})
