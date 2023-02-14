export function removeScripts(input: string): string {
    const scriptRegex = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
    return input.replace(scriptRegex, '')
        .trimStart()
}
