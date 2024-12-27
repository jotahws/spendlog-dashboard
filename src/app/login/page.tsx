'use client';

import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const formSchema = z.object({
  apiKey: z.string({ message: 'Invalid api key format' }),
});
export default function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      apiKey: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    document.cookie = `Authorization=Bearer ${values.apiKey}; path=/; SameSite=None; Secure expires=Fri, 31 Dec 9999 23:59:59 GMT;`;
    window.location.href = '/';
  }

  useEffect(() => {
    document.cookie =
      'Authorization=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;';
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-md w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="apiKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>API Key</FormLabel>
                  <FormControl>
                    <Input placeholder="123ABC" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
