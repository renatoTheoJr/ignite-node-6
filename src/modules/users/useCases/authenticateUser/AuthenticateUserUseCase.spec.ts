import { InMemoryUsersRepository } from "@modules/users/repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase"
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { IncorrectEmailOrPasswordError } from "./IncorrectEmailOrPasswordError";


let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: InMemoryUsersRepository;

describe("Authenticate", ()=>{
    beforeEach(()=>{
      usersRepositoryInMemory = new InMemoryUsersRepository();
      createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
      authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
    }
  )
  it("should be able to authenticate a exists user", async ()=>{
    await createUserUseCase.execute({
      name: "Test",
      email: "test@test.com",
      password: "senha"
    });
    const tokenUser = await authenticateUserUseCase.execute({
      email: "test@test.com",
      password: "senha"
    })

    expect(tokenUser).toHaveProperty("token");
  })

  it("should not be able to authenticate a non exists user", ()=>{
      expect(async () => {
        await createUserUseCase.execute({
          name: "Test",
          email: "test@test.com",
          password: "senha"
        });
      }).rejects.toBeInstanceOf(IncorrectEmailOrPasswordError);
  })
})
