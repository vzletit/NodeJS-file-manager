import parseCliArg from "../../src/helpers/parseCliArg.js";

test('parseCLiArg', () => {
    expect( parseCliArg(['','', '--', '--username=Dmitry', '--userlastname=Agurkov'], 'username') ).toEqual(`Dmitry`);
    })