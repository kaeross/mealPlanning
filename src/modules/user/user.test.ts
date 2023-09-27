import {describe, expect, test} from "bun:test";
import {User} from "@modules/user";

describe('user', () => {
  test('creates a new user', () => {
    const user1 = User.create('username', 'password');

    expect(user1.username).toBe('username');
  });

  test('logs in a user', () => {
    const user1 = User.create('username', 'password');

    expect(user1.login('username', 'password')).toBeTrue();
  });
})