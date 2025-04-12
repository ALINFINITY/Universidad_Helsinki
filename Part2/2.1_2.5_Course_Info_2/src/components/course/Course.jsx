import {Header} from './Header'
import { Content } from './Content';

export const Course = ({title,courses}) => {
  return (
    <>
      <Header name={title} />
      <Content courses={courses} />
    </>
  );
};
