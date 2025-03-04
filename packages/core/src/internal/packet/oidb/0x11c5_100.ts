import { NTV2RichMediaRequestOf } from '@/internal/packet/oidb/media/request/NTV2RichMediaRequest';
import { NTV2RichMediaResponseOf } from '@/internal/packet/oidb/media/response/NTV2RichMediaResponse';
import { OidbSvcContract } from '@/internal/util/binary/oidb';

export const UploadPrivateImage = new OidbSvcContract(
    0x11c5, 100,
    NTV2RichMediaRequestOf('upload'),
    false, true,
);

export const UploadPrivateImageResponse = new OidbSvcContract(
    0x11c5, 100,
    NTV2RichMediaResponseOf('upload'),
);