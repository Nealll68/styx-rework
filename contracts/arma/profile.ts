export default interface ArmaProfileInterface {
  create(name: string): Promise<void>
  read(name: string, file: string): Promise<String>
  update(name: string, file: string, content: string): Promise<void>
  delete(name: string): Promise<void>
}