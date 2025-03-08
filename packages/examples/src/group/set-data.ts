import bot from '../login/fast';

(await bot.getGroup(0))?.onMessage(msg => {
    if (msg.type === 'bubble' && msg.content.segments[0].type === 'text') {
        const content = msg.content.segments[0].content;
        if (content.startsWith('/title')) {
            const title = content.slice(6).trim();
            if (title.length !== 0)
                msg.sender.setSpecialTitle(title);
        } else if (content.startsWith('/card')) {
            const card = content.slice(5).trim();
            if (card.length !== 0)
                msg.sender.setCard(card);
        }
    }
});