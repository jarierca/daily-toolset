import React from 'react';

const EmojiList = () => {
  const emojis = [];

  const ranges = [
    [0x1F600, 0x1F64F], // Emoticons
    [0x1F300, 0x1F5FF], // Miscellaneous Symbols and Pictographs
    [0x1F680, 0x1F6FF], // Transport and Map Symbols
    [0x1F900, 0x1F9FF], // Supplemental Symbols and Pictographs
    [0x2600, 0x26FF],   // Miscellaneous Symbols
    [0x2700, 0x27BF],   // Dingbats
  ];

  // Emojis to avoid
  const emojisToAvoid = [
    '🌢', '🌣', '🎔', '🎕', '🎘', '🎜', '🎝', '🏱', '🏲', '🏶', '📾', '🔾', '🔿', '🕀', '🕁',
    '🕂', '🕃', '🕄', '🕅', '🕆', '🕇', '🕈', '🕨', '🕩', '🕪', '🕫', '🕬', '🕭', '🕮', '🕱',
    '🕲', '🕻', '🕼', '🕽', '🕾', '🕿', '🖀', '🖁', '🖂', '🖃', '🖄', '🖅', '🖆', '🖈', '🖉',
    '🖎', '🖏', '🖑', '🖒', '🖓', '🖔', '🖗', '🖘', '🖙', '🖚', '🖛', '🖜', '🖝', '🖞', '🖟',
    '🖠', '🖡', '🖢', '🖣', '🖦', '🖧', '🖩', '🖪', '🖫', '🖬', '🖭', '🖮', '🖯', '🖰', '🖳',
    '🖴', '🖵', '🖶', '🖷', '🖸', '🖹', '🖺', '🖻', '🖽', '🖾', '🖿', '🗀', '🗁', '🗅', '🗆',
    '🗇', '🗈', '🗉', '🗊', '🗋', '🗌', '🗍', '🗎', '🗏', '🗐', '🗔', '🗕', '🗖', '🗗', '🗘',
    '🗙', '🗚', '🗛', '🗟', '🗠', '🗢', '🗤', '🗥', '🗦', '🗧', '🗩', '🗪', '🗫', '🗬', '🗭',
    '🗮', '🗰', '🗱', '🗲', '🗴', '🗵', '🗶', '🗷', '🗸', '🗹', '🛆', '🛇', '🛈', '🛉', '🛊',
    '🛓', '🛔', '🛘', '🛙', '🛚', '🛛', '🛦', '🛧', '🛨', '🛪', '🛭', '🛮', '🛱', '🛲', '🛽',
    '🛾', '🛿', '🤀', '🤁', '🤂', '🤃', '🤄', '🤅', '🤆', '🤇', '🤈', '🤉', '🤊', '🤋', '🤻',
    '🥆', '⚿', '⛆', '⛇', '⛉', '⛊', '⛋', '⛌', '⛍', '⛐', '⛒', '⛕', '⛖', '⛗', '⛘', '⛙',
    '⛚', '⛛', '⛜', '⛝', '⛞', '⛟', '⛠', '⛡', '⛣', '⛤', '⛥', '⛦', '⛧', '⛨', '⛫', '⛬',
    '⛭', '⛮', '⛯', '⛶', '⛻', '⛼', '⛾', '⛿', '✀'
  ];

  const filterEmojis = (emoji) => {
    return !emojisToAvoid.includes(emoji);
  };

  ranges.forEach(([start, end]) => {
    for (let i = start; i <= end; i++) {
      const emoji = String.fromCodePoint(i);
      if (filterEmojis(emoji)) {
        emojis.push(emoji);
      }
    }
  });

  const copyToClipboard = (emoji) => {
    navigator.clipboard.writeText(emoji)
      .then(() => {
        alert(`Emoji Copied: ${emoji}`);
      })
      .catch((err) => {
        console.error('Failed to copy:', err);
      });
  };

  return (
    <div className="container mt-5 px-5">
      <h2>Emoji List</h2>
      <div className="emoji-list mt-5">
        {emojis.map((emoji, index) => (
          <span key={index} className="emoji" onClick={() => copyToClipboard(emoji)} role="img" aria-label="emoji"  >
            {emoji}
          </span>
        ))}
      </div>
    </div>
  );
};

export default EmojiList;

