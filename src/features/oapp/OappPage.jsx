import React from 'react';
import { Accordion } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
  faBook,
  faComments,
  faExternalLinkAlt,
  faHandsHelping,
  faRunning,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PageFrame from '../common/PageFrame';
import tree from './menutree.json';
import { useState } from 'react';

const idToIcon = (id) => {
  if (id === 'studieren') return faBook;
  if (id === 'soziales') return faHandsHelping;
  if (id === 'kultur-freizeit-kontakte') return faRunning; // faBiking;
  if (id === 'beratung') return faComments;
};

const getStyle = (level) => {
  return {
    position: 'relative',
    display: 'flex',
    padding: '0.75rem 1.25rem',
    paddingLeft: level === 3 ? '2.5rem' : '1.25rem',
    marginBottom: '-1px',
    backgroundColor: level === 1 ? 'rgba(0, 0, 0, 0.03)' : '#fff',
    border: '1px solid rgba(0, 0, 0, 0.125)',
    borderWidth: '1px 0',
    alignItems: 'center',
  };
};

const LinkItem = ({ item, level, ...props }) => {
  const type =
    !item.href || item.href === '#'
      ? 0
      : item.external
      ? 2
      : item.href[0] === '/'
      ? 1
      : 0;
  const Element = ['a', Link, 'a'][type];
  return (
    <Element
      key={item.id}
      to={type === 1 ? '/oapp' + item.href : undefined}
      href={type === 2 ? item.href : undefined}
      target={type === 2 ? 'blank' : undefined}
      style={getStyle(level)}
      {...props}
    >
      {level === 1 && idToIcon(item.id) ? (
        <FontAwesomeIcon
          icon={idToIcon(item.id)}
          style={{ minWidth: '1.5em', marginRight: '0.4em' }}
        />
      ) : null}
      <div style={{ flexGrow: '1' }}>{item.title}</div>
      {type === 2 ? (
        <FontAwesomeIcon
          icon={faExternalLinkAlt}
          style={{ marginLeft: '0.4em' }}
        />
      ) : null}
    </Element>
  );
};

const OappPage = () => {
  const [activeKey, setActiveKey] = useState([tree[0].id]);
  const getKey = (l) => activeKey[l - 1];
  const setKey = (l, key) => setActiveKey([...activeKey.slice(0, l - 1), key]);

  return (
    <PageFrame title="Orientierung">
      <Accordion
        activeKey={getKey(1)}
        style={{ marginLeft: '-15px', marginRight: '-15px' }}
        onSelect={(key) => setKey(1, key)}
      >
        {tree.map((l1) => (
          <div key={l1.id}>
            <Accordion.Toggle
              as={LinkItem}
              item={l1}
              level={1}
              eventKey={l1.id}
            />
            <Accordion.Collapse eventKey={l1.id}>
              <Accordion
                activeKey={getKey(2)}
                onSelect={(key) => setKey(2, key)}
              >
                {l1.items.map((l2) =>
                  l2.href ? (
                    <LinkItem key={l2.id} item={l2} level={2} />
                  ) : (
                    <div key={l2.id}>
                      <Accordion.Toggle
                        as={LinkItem}
                        item={l2}
                        level={2}
                        eventKey={l2.id}
                      />
                      <Accordion.Collapse eventKey={l2.id}>
                        <>
                          {l2.items.map((l3) => (
                            <LinkItem key={l3.id} item={l3} level={3} />
                          ))}
                        </>
                      </Accordion.Collapse>
                    </div>
                  )
                )}
              </Accordion>
            </Accordion.Collapse>
          </div>
        ))}
      </Accordion>
    </PageFrame>
  );
};

export default OappPage;
