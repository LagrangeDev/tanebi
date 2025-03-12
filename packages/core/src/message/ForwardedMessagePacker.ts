import { Bot, ctx, OutgoingSegmentOf } from '@/index';
import { ForwardedMessageBuilder, OutgoingForwardedMessage } from '.';

export class ForwardedMessagePacker {
    private clientSequence = 100000;
    private messages: OutgoingForwardedMessage[] = [];
    private preview: string[] = [];

    constructor(private readonly bot: Bot, private readonly groupUin?: number) {}

    /**
     * Add a fake message to the packer.
     * @param uin 
     * @param nick 
     * @param buildMsg 
     */
    async fake(uin: number, nick: string, buildMsg: (b: ForwardedMessageBuilder) => void | Promise<void>) {
        const builder = new ForwardedMessageBuilder(uin, nick, this.bot);
        // When uploading resources, use the bot itself's uid.
        await buildMsg(builder);
        const msg = builder.build(this.clientSequence++);
        this.messages.push(msg);
        if (this.preview.length < 4) {
            this.preview.push(generatePreview(msg));
        }
    }

    /**
     * Pack the messages.
     */
    async pack(): Promise<OutgoingSegmentOf<'forward'>> {
        return {
            type: 'forward',
            resId: await this.bot[ctx].ops.call('uploadLongMessage', this.messages, this.groupUin),
            preview: this.preview,
            count: this.messages.length
        };
    }
}

function generatePreview(msg: OutgoingForwardedMessage) {
    return msg.nick + ': ' + (msg.segments.map(s => {
        if (s.type === 'text') {
            return s.content;
        } else if (s.type === 'face') {
            return '[表情]';
        } else if (s.type === 'image') {
            return '[图片]';
        } else if (s.type === 'forward') {
            return '[聊天记录]';
        }
        return '';
    }).join('') || '[转发消息]');
}