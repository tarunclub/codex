import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInputType, formSchema } from 'types';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export default function CreatePlayground() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      language: '',
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: FormInputType) => {
    console.log(values);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={'outline'}>Create</Button>
      </DialogTrigger>
      <DialogContent className="overflow-hidden">
        <DialogHeader className="px-4">
          <DialogTitle className="">Create a new Playground</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 py-4 px-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="uppercase text-xs font-bold">
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      {...field}
                      placeholder="Project Name"
                      className=""
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="uppercase text-xs font-bold">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      {...field}
                      placeholder="Description"
                      className=""
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* I want a select field with options of nodejs, javascript, typescript using shadcn */}
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Nodejs</SelectItem>
                <SelectItem value="dark">Javascript</SelectItem>
                <SelectItem value="system">Typescript</SelectItem>
              </SelectContent>
            </Select>

            <DialogFooter>
              <Button
                type="submit"
                className="px-6 py-3 rounded-md disabled:opacity-50"
                disabled={isLoading}
              >
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
