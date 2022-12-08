import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PageFrame from '../../components/PageFrame';
import articles from './articles.json';

const Entry = ({ children, link, level }) => (
  <div
    onClick={link && (() => window.open(link, '_blank'))}
    className="px-4 py-2"
    style={{ alignItems: 'center', color: '#495057', display: 'flex' }}
  >
    <div style={{ flexGrow: '1', marginLeft: `${level || 0}em` }}>
      {children}
    </div>
    {link && <FontAwesomeIcon icon={faAngleRight} />}
  </div>
);

const WikiPage = () => {
  return (
    <PageFrame title="Orientierung">
      <div className="divide-y">
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
      </div>
    </PageFrame>
  );
};

export default WikiPage;
