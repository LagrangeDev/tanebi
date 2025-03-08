import { OidbSvcContract } from '@/internal/util/binary/oidb';
import { ProtoField, ScalarType } from '@napneko/nap-proto-core';

export const LeaveGroup = new OidbSvcContract(
    0x1097, 1,
    {
        groupUin: ProtoField(1, ScalarType.UINT32),
    }
);