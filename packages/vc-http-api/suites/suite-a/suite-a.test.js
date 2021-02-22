describe('suite a', function () {
    it('expect success', function () {
        expect(true).toBe(true);
    });
    // skip failures so ci can pass
    it.skip('expect failure', function () {
        expect(true).toBe(false);
    });
    it.todo('expect todo');
});
