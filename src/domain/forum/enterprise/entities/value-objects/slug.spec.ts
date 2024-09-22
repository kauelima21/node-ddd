import { Slug } from './slug'

test('it should be able to create a new slug', () => {
  const slug = Slug.create('example-question-title')
  expect(slug.value).toEqual('example-question-title')
})

test('it should be able to create a new slug from text', () => {
  const slug = Slug.createFromText('Example_quéstion title-')
  expect(slug.value).toEqual('example-question-title')
})
