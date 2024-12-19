function distributeWeight(weight: number): any {
    const boxRepresentations = {
        10: ["|_________|", "|         |", " _________ "],
        5: ["|_____|", "|     |", " _____ "],
        2: ["|___|", " ___ "],
        1: ["|_|", " _ ",],
    }

    const repeated = ( times: number, array: string[] ) => {
        if( times > 1 ){
            let result: any[] = [];
            for (let i = 0; i < times - 1; i++) {
                result.push(...array.slice(0, -1));
            }
            result.push(...array);
            return result;
        }
        return array;
    }

    let result: string[] = [];
    const units = [10, 5, 2, 1];
    let index = 0;
    while (index < units.length) {
        const unit = units[index];
        const count = Math.floor(weight / unit);
        let arrayToAdd: string[] = [];
        if( count > 0 ){
            arrayToAdd = repeated( count, boxRepresentations[units[index]]);
            console.log( arrayToAdd )
        }
        if( result.length === 0){
            result = [...result, ...arrayToAdd];
        }else{
            if( arrayToAdd.length > 0 ){
                let start = arrayToAdd[0];
                let final = result[result.length - 1];
                const newFinal = start + final.slice(start.length);
                result.splice(-1);
                result = [...result, newFinal.trim(), ...arrayToAdd.splice(1)]
            }
        }
        weight %= unit;
        index++;
    }

    return result.reverse().join("\n");
}
distributeWeight(121)