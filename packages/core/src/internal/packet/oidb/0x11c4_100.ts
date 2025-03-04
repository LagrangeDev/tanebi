import { NTV2RichMediaRequestOf } from '@/internal/packet/oidb/media/request/NTV2RichMediaRequest';
import { NTV2RichMediaResponseOf } from '@/internal/packet/oidb/media/response/NTV2RichMediaResponse';
import { OidbSvcContract } from '@/internal/util/binary/oidb';

export const UploadGroupImage = new OidbSvcContract(
    0x11c4, 100,
    NTV2RichMediaRequestOf('upload'),
    false, true,
);

export const UploadGroupImageResponse = new OidbSvcContract(
    0x11c4, 100,
    NTV2RichMediaResponseOf('upload'),
);