import * as _ from 'lodash';

export interface GuessResult {
    result: boolean;
    eats: number;
    bites: number;
}

export function createAnswer(length: number): string {
    return _.join(_.take(_.shuffle(_.range(10)), length), '');
}

export function guess(answer: string, guessValue: string): GuessResult {
    const res = {
        result: false,
        eats: 0,
        bites: 0,
    };

    if (answer === null || guessValue === null) {
        return res;
    }

    if (answer.length !== guessValue.length) {
        return res;
    }

    if (answer === guessValue) {
        res.result = true;
        res.eats = answer.length;
        return res;
    }

    const answerChars = _.split(answer, '');
    const guessChars = _.split(guessValue, '');

    answerChars.forEach((answerChar: string, i: number) => {
        if (answerChar === guessChars[i]) {
            res.eats += 1;
        } else if (_.includes(guessChars, answerChar)) {
            res.bites += 1;
        }
    });

    return res;
}
