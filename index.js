import { uniq } from "lodash";

const msg = "Hello World!";
const l = [2, 3, 4, 2, 1, 4, 3];
const f = () => {
    console.log(msg);
    console.log(_.uniq(l));
};
f();
