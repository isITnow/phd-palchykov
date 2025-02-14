import React, { useRef } from 'react';
import { motion } from 'framer-motion';

import Research from './Research';

import motionOptions from '@/utils/motionOptions';
import s from '@/components/Research/research.module.css';

const ResearchList = ({ researches }) => {
  const listItemRefs = useRef(researches.map(() => React.createRef()));

  const handleClickScroll = (index) => {
    const element = listItemRefs.current[index];
    if (element.current) {
      element.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <ul>
        {researches.map(({ id, title }, index) => (
          <li
            className={`text-secondary ${s.hoverEffect}`}
            key={id}
            onClick={() => handleClickScroll(index)}
          >{`# ${title}`}</li>
        ))}
      </ul>
      <ul>
        {researches.map((research, index) => (
          <motion.li
            className="mb-5 border-2 border-bottom border-secondary pb-3"
            key={research.id}
            ref={listItemRefs.current[index]}
            animate="animate"
            transition="transition"
            exit="exit"
            variants={motionOptions.listItemMotion}
          >
            <Research research={research} index={index + 1} />
          </motion.li>
        ))}
      </ul>
    </>
  );
};

export default ResearchList;
