import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UserProfile from '@/domains/users/components/UserProfile.vue'
import type { User } from '@/domains/users/types'

// Mock the getUserInitials utility function
const getUserInitials = (user: User) => {
  return user.name
    .split(' ')
    .map(n => n.charAt(0))
    .join('')
    .toUpperCase()
}

// Make the function globally available for the component
global.getUserInitials = getUserInitials

describe('UserProfile', () => {
  const mockUser: User = {
    username: 'johndoe',
    name: 'John Doe',
    email: 'john.doe@example.com',
  }

  it('renders user information correctly', () => {
    const wrapper = mount(UserProfile, {
      props: {
        user: mockUser,
      },
    })

    expect(wrapper.text()).toContain('Username: johndoe')
    expect(wrapper.text()).toContain('Name: John Doe')
    expect(wrapper.text()).toContain('Email: john.doe@example.com')
  })

  it('displays user initials correctly', () => {
    const wrapper = mount(UserProfile, {
      props: {
        user: mockUser,
      },
    })

    expect(wrapper.text()).toContain('initials: JD')
  })

  it('applies correct CSS classes', () => {
    const wrapper = mount(UserProfile, {
      props: {
        user: mockUser,
      },
    })

    const container = wrapper.find('div')
    expect(container.classes()).toContain('bg-gray-100')
    expect(container.classes()).toContain('rounded')
    expect(container.classes()).toContain('p-2')
    expect(container.classes()).toContain('mb-5')
  })

  it('renders all user fields in list format', () => {
    const wrapper = mount(UserProfile, {
      props: {
        user: mockUser,
      },
    })

    const listItems = wrapper.findAll('li')
    expect(listItems).toHaveLength(4)

    expect(listItems[0].text()).toBe('Username: johndoe')
    expect(listItems[1].text()).toBe('Name: John Doe')
    expect(listItems[2].text()).toBe('initials: JD')
    expect(listItems[3].text()).toBe('Email: john.doe@example.com')
  })
})
