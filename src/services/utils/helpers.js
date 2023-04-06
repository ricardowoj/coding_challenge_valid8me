/**
 * You don't need to make any changes to this module
 */

export async function sleep(ms = 500) {
    return await new Promise(resolve => setTimeout(resolve, ms));
}