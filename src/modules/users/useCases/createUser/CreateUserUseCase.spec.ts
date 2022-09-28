import { AppError } from "../../../../shared/errors/AppError";
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "./CreateUserUseCase";


let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: InMemoryUsersRepository;

describe("Create User", () => {



  beforeEach(()=>{
    usersRepositoryInMemory = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });


  it("should be able to create  a new user", async () => {
      const user = await createUserUseCase.execute({
        name: "Test",
        email: "test@test.com",
        password: "senha"
      });
      expect(user).toHaveProperty("id");
    })

  it("should not be able to create a new user with the same email",() => {
      expect( async ()=>{
        await createUserUseCase.execute({
          name: "Test",
          email: "test@test.com",
          password: "senha"
        });
        const user = await createUserUseCase.execute({
          name: "Test",
          email: "test@test.com",
          password: "senha"
        });
      }).rejects.toBeInstanceOf(AppError);
    })

    it("should not be able to create a new user with empty email",() => {
      expect( async ()=>{
        await createUserUseCase.execute({
          name: "Test",
          email: "",
          password: "senha"
        });
      }).rejects.toBeInstanceOf(AppError);
    })
  }
)
