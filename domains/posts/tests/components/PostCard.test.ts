import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PostCard from '@/domains/posts/components/PostCard.vue'
import type { Post } from '@/domains/posts/types'

describe('PostCard', () => {
  const mockPost: Post = {
    id: 1,
    title: 'Test Post Title',
    body: 'This is a test post body content.',
    author: {
      username: 'johndoe',
      name: 'John Doe',
      email: 'john.doe@example.com'
    }
  }

  it('renders post information correctly', () => {
    const wrapper = mount(PostCard, {
      props: {
        post: mockPost
      }
    })

    expect(wrapper.text()).toContain('Test Post Title')
    expect(wrapper.text()).toContain('John Doe')
  })

  it('displays post snippet correctly', () => {
    const mockPostWithSnippet = {
      ...mockPost,
      snippet: 'This is a test snippet'
    }

    const wrapper = mount(PostCard, {
      props: {
        post: mockPostWithSnippet
      }
    })

    expect(wrapper.text()).toContain('This is a test snippet')
  })

  it('displays author information with "By" prefix', () => {
    const wrapper = mount(PostCard, {
      props: {
        post: mockPost
      }
    })

    expect(wrapper.text()).toContain('By John Doe')
  })

  it('applies correct CSS classes', () => {
    const wrapper = mount(PostCard, {
      props: {
        post: mockPost
      }
    })

    const container = wrapper.find('div')
    expect(container.classes()).toContain('bg-gray-100')
    expect(container.classes()).toContain('rounded')
    expect(container.classes()).toContain('p-2')
    expect(container.classes()).toContain('mb-5')
  })

  it('has correct HTML structure', () => {
    const wrapper = mount(PostCard, {
      props: {
        post: mockPost
      }
    })

    // Check that we have the basic structure based on the actual component
    expect(wrapper.find('h2').exists()).toBe(true)
    expect(wrapper.find('p').exists()).toBe(true)
    expect(wrapper.find('div').exists()).toBe(true)
  })
})