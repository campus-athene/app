import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import PageFrame from '../common/PageFrame';
import articles from './articles.json';

const Entry = ({ children, link, level }) => (
  <ListGroupItem
    action={!!link}
    onClick={link && (() => window.open(link, '_blank'))}
    style={{ alignItems: 'center', color: '#495057', display: 'flex' }}
  >
    <div style={{ flexGrow: '1', marginLeft: `${level || 0}em` }}>
      {children}
    </div>
    {link && <FontAwesomeIcon icon={faAngleRight} />}
  </ListGroupItem>
);

const WikiPage = () => {
  return (
    <PageFrame title="Orientierung">
      <ListGroup>
        {articles
          .map(({ title, link, seealso }) => {
            return [
              <Entry key={link || title} link={link}>
                {title}
              </Entry>,
              ...(seealso || []).map((sa) => (
                <Entry key={`${title}#${sa.link}`} link={sa.link} level={1}>
                  {sa.title}
                </Entry>
              )),
            ];
          })
          .flat()}
      </ListGroup>
    </PageFrame>
  );
};

export default WikiPage;
