import courseoffers from './courseoffers';
import modules from './courses';
import messages from './messages';

const dummyResponse = async (path, body) => {
  await new Promise((r) => setTimeout(() => r(), 8000));
  switch (path) {
    case '/account/settings':
      return null;
    case '/tucan/messages':
      return messages;
    case '/tucan/courses':
      return modules;
    case '/tucan/courseoffers':
      if (!body?.area) return courseoffers[0];
      if (body.area === 356174056985552) return courseoffers[356174056985552];
      throw new Error(
        `No dummy response for course offers area ${body.area} implemented.`
      );
    default:
      throw new Error(`No dummy response for "${path}" implemented.`);
  }
};

export default dummyResponse;
