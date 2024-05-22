import dayjs from 'dayjs';
import { getRangeBetweenNumbers } from '@/utils';

const useDate = () => {
    const convertDate = (date) => date.set({h: 0, m: 0, s: 0});
    const formatConfig = 'DD-MM-YYYY';
    return {
        convertDate,
        formatConfig
    }
}

const disabledRemainingHoursCB = (current) => () => getRangeBetweenNumbers(current?.h + 1, 24);
const disableRemainingMinutesCB = (current) => (hour) => hour >= current?.h ? getRangeBetweenNumbers(current?.m + 1, 60) : []; 
const disableRemainingSecondsCB = (current) => (hour, minute) => hour >= current?.h && minute >= current?.m ? getRangeBetweenNumbers(current?.s + 1, 60) : [];

const disabledDateAfterToday = {
    disabledDate: (v) => v && v.isAfter(dayjs().endOf('day'))
}

const disabledTimeAfterNow = {
    disabledTime: (v) => {
        if(v?.isSame(dayjs())) {
            const current = {
                h: dayjs().get('hour'),
                m: dayjs().get('minute'),
                s: dayjs().get('second')
            };
            return {
                disabledHours: disabledRemainingHoursCB(current),
                disabledMinutes: disableRemainingMinutesCB(current),
                disabledSeconds: disableRemainingSecondsCB(current)
            };
        }
        return undefined;
    }
}

const disableTimeAndDateAfterNow = {
    ...disabledDateAfterToday,
    ...disabledTimeAfterNow
}

export const DATE_PICKER_PROPS = {
    disableTimeAndDateAfterNow
}

export { useDate };