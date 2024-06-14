import { message } from 'antd';

export default function utilsCkeckSpace(data) {
  const trimmedData = {
    ...data,
    title: data.title.trim(),
    description: data.description.trim(),
    body: data.body.trim(),
    tags: data.tags.map((tag) => (typeof tag === 'string' ? tag.trim() : tag)),
  };

  if (
    !/^(?![\s\n]*$).+/.test(trimmedData.title) ||
    !/^(?![\s\n]*$).+/.test(trimmedData.body) ||
    !/^(?![\s\n]*$).+/.test(trimmedData.description)
  ) {
    message.error('Data cannot be empty or contain only spaces');
    return;
  }

  return trimmedData;
}
