import {removeScripts} from "../security.util";

describe("securityUtils", () => {
    describe("removeScripts()", () => {
        it('should return empty string', function () {
            expect(removeScripts("<script>alert('hello')</script>"))
                .toBe('')
        });
        it('should return string without script', function () {
            expect(removeScripts("<script>alert('hello')</script> its comment"))
                .toBe('its comment')
        });
    })
})
